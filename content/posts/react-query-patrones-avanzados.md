---
title: React Query patrones avanzados
date: 2025-07-16
excerpt: advance react query patters
tags: 
- react 
---


# Simple Queries

```tsx
export const ContactTable = () => {
  const { data, isPending, isError, refetch } = useQuery({
        queryFn: () => client.getContacts()
        queryKy: ["contacts", "list"]
  })

  if (isPending) return <LoadingCard /> 
  if (isError) return <Alert onRetryClick={refetch} />


    return (
    <Table 
            columns={["Name"]}
            rows={data.contacts.map(
                (contact) => contact.firstName + " " + contact.lastName
          )}
    />
  )
}
```


# Custom Queries

```tsx
// in query.ts
const useContacts = () => {
    useQuery({
        queryKy: ["contacts", "list"]
        queryFn: () => client.getContacts(),
  })
}

```

```tsx
export const ContactTable = () => {
  const { data, isPending, isError, refetch } = useContacts()

  if (isPending) return <LoadingCard /> 
  if (isError) return <Alert onRetryClick={refetch} />

    /* render ui */
}
```

# Selectors 

```tsx
// in query.ts
export const contactsListQuery = () => queryOptions({
        queryKy: ["contacts", "list"]
        queryFn: () => client.getContacts(),
  })

```

```tsx
// in ContactTable.tsx
export const ContactTable = () => {
  const { data, isPending, isError, refetch } = useQuery(contactsListQuery) 

  if (isPending) return <LoadingCard /> 
  if (isError) return <Alert onRetryClick={refetch} />

    /* render ui */
}
```

```tsx
// in top bar
export const TopBar = () => {
  const { data } = useQuery({
        ...contactsListQuery, 
        select: (data) => data.contacts.length
    }) 

    return (
        <div>
            <Title>{data} Contacts</Title>
        </div>
  )
}
```

# Parametized Queries

```tsx
// in query.ts
export const oneContactQuery = (id: string) => 
    queryOptions({
        queryKy: ["contacts", "one", { id } ]
        queryFn: () => client.getContact(id)
    })
```

```tsx
// usabe 
export const ContactPage = () => {
    const { contactId } = useUrlParams()
    const { data, isPending, isError } = useQuery(oneContactQuery(contactId))
    /* ... */
}
```

# Pagination

```tsx
// in query.ts
export const contactsListQuery = (page: number, count: number) => queryOptions({
        queryKy: ["contacts", "list", { page }, { count }]
        queryFn: () => client.getContacts(page, count),
  })

```

```tsx
// in ContactTable.tsx
export const ContactTable = () => {
    const [page, setPage] = useState(1)
    const { /**/ } = useQuery(contactsListQuery(page, 10))

    const onNextPageClick = () => {
        setPage(page + 1)
    }

    /* render ui */
```

# Disabling queries


# Prefetching
```tsx
// in ContactTable.tsx
export const ContactTable = () => {
    const [page, setPage] = useState(1)
    const { data, isPending, isError, refetch } = useQuery(contactsListQuery(page, 10))

    const onNextPageClick = () => {
        setPage(page + 1)
    }

    const queryClient = useQueryClient()

    useEffect() => {
        queryClient.prefetchQuery(contactsListQuery(page + 1, 10))
    }, [queryClient, page])

    /* render ui */
```

# Infinite queries

```tsx
// the fetching function 
// type of client.getContact
type GetContatcts = (param: { cursor: string | undefined }) => {
    contacts: Contact[],
    nextCursor: string | undefined
}
```

```tsx
// page !
const page1 = client.getContacts({ cursor: undefined })
// page 3
const page2 = client.getContacts({ cursor: page1.nextCursor })
// page 3
const page3 = client.getContacts({ cursor: page2.nextCursor })
```


```tsx
// in query.ts
export const contactsListQuery = queryOptions({
        queryKy: ["contacts", "list"]
        queryFn: async ({ pageParam }) => client.getContacts(pageParam),
        initialPageParam: { cursor: undefined },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

```

```tsx
// in ContactTable.tsx
export const ContactTable = () => {
    const { 
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    } = useInfinityQuery(contactsListQuery)


    return (
    // ...
        <Button 
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
        >
            Load More
        </Button>
    // ...
  )
```

# Query Key Factories

```tsx

const queryKeys = {
    all: () => ["contacts"]
    contacts: (page: number, count: number) => [
            queryKeys.all(),
            "list",
            { page },
            { count }
    ]
    contact: (id: string | undefined) => [
            queryKeys.all(),
            "one",
            { id }
    ]
}
// in query.ts
export const contactsListQuery = (page: number, count: number) => queryOptions({
        queryKey: queryKeys.contacts(page, count),
        queryFn: () => client.getContacts(page, count),
  })

// in query.ts
export const oneContactQuery = (id?: string) => 
    queryOptions({
        queryKy: queryKey.contact(id)
        queryFn: () => client.getContact(id)
        enabled: id !== undefined
    })
```

# Simple Mutations

```tsx
// in query.ts
export const useDeleteContact = () => 
    useMutation({
        mutationFn: (id: string) => client.delete(id)
        onSuccess: (id: string) => {
            return notifications.show({
                icon: <IconCircleCheckFilled />,
                color: "green",
                message: "Contact deleted",
            })
        },
        onError: (error) => {
            return notifications.show({
                icon: <IconCircleCloseFilled />,
                color: "red",
                message: "Error deleting contact",
            })
        }
    })
```

```tsx
export const DeleteContactButton = ({ id }: DeleteContactButtonProps) => {
    const { mutate, isPending } = useDeleteContact()

    return (
        <Button
            onClick={() => mutate(id)}
            loading={isPending}
        >
            Delete
        </Button>
    )
}   

```

# Query Invalidation

onSettled se llama solo cuando la mutacion haya terminado ya se cumpla como onSuccess o onError, y asi invalidaremos todas las consultas

```tsx
// in query.ts
export const useDeleteContact = () => 
    const queryClient = useQueryClient()
    useMutation({
        mutationFn: (id: string) => client.delete(id),
        onSuccess: (id: string) => {
            return notifications.show({
                icon: <IconCircleCheckFilled />,
                color: "green",
                message: "Contact deleted",
            })
        },
        onError: (error) => {
            return notifications.show({
                icon: <IconCircleCloseFilled />,
                color: "red",
                message: "Error deleting contact",
            })
        },
        onSettled: () => queryClient.invalidateQueries(queryKeys.all())
    })
```

# Automatic query invalidation

```tsx
// in query.ts
export const useDeleteContact = () => useMutation({
    mutationFn: (id: string) => client.delete(id),
    meta: { invalidateQuery: ["contacts"], }
})
```


```tsx
// in main.ts
const queryClient = new QueryClient({
    onSettled: (_data, _error, _variable, mutation) => {
        if (mutation.meta?.invalidateQuery) {
            queryClient.invalidateQueries({
                queryKey: mutation.meta.invalidateQuery 
            })
        }
    },
})

export default function Pattern () {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}
```

# Global error handling

```tsx
// in main.tsx

const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSettled: /* ... */
        onError: (error) => {
            if (error?.status === 401) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }
    })
})

```

# Optimistic Update ui

```tsx
export const ContactsTable = ({onContactClick}: ContactsTableProps) => {
    const [ page, setPage ] = useState(1)
    const { data, isPending, isError, refetch } = useQuery(contactsListQuery(page, 10))

    const { contactId } = useContactsBeginDeleted()

    /* redner UI */
}

```


```tsx
// in query.ts 
export const useDeleteContact = () => {
    const queryCLient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => client.delete(id),
        mutationKey: ["delete-contact"]
  })
}

export const useContactsBeginDeleted = () => {
    const mutations = useMutationState({
        filters: { mutationKey: ["delete-contact"] },
  })
}

```

```tsx
// in query.ts 
export const useContactsBeginDeleted = () => {
    const mutations = useMutationState({
        filters: { mutationKey: ["delete-contact"] },
    })
    const contactId = mutations
        .filter((mutation) => mutation.status === ´pending')
        .map((mutation) => mutation.variables as string)
    return { contactId }
}

```

# Optimistic Update in Cache

```tsx
// in query.ts 
export const useDeleteContact = () => {
    const queryCLient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => client.delete(id),
        onMutate: async (id) => {
            // cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ["contacts", "list"]})

            const preveiousContactPage = queryClient.getQueryData<GetContactsResponse>({
                queryKey: ["contacts", "list"]
            })

            const filtereContactPages = preveiousContactPage.map(
                ([queryKey, page]) => [
                    queryKey,
                    {
                        ...page,
                        contacts: page.contacts.filter((contact) => contact.id !== id)
                    },
              ] as const
            )
            filtereContactPages.forEach(([queryKey, page]) => queryClient.setQueryData(queryKey, page))

            // return a context with the preveius and new todo 
            return { previousContactPage }
            
        },
        // if the mutation fails, use the context we returned above

        onError: (_1, _2, context) => {
            queryClient.setQueryData(
                ["contacts", "list"],
                context?.previousContactPage
            )
        },
        onSettled: () => queryClient.invalidateQueries(queryKeys.all())
    })
}


