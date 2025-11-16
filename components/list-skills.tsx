const path = "/skills";
const skills = [
  {
    skill: "Github",
    source: `${path}/github.svg`,
  },
  {
    skill: "Html",
    source: `${path}/html-svgrepo-com.svg`,
  },
  {
    skill: "Css",
    source: `${path}/css.svg`,
  },
  {
    skill: "Golang",
    source: `${path}/go.svg`,
  },
  {
    skill: "Java",
    source: `${path}/java-svgrepo-com.svg`,
  },
  {
    skill: "Python",
    source: `${path}/python-svgrepo-com.svg`,
  },
  {
    skill: `TypeScript`,
    source: `${path}/typescript.svg`,
  },
  {
    skill: "Deno",
    source: `${path}/deno.svg`,
  },
  {
    skill: "React",
    source: `${path}/react-svgrepo-com.svg`,
  },
  {
    skill: "Kotlin",
    source: `${path}/kotlin.svg`,
  },
];
interface Props {
  source: string;
  skill: string;
}

function Skills() {
  return (
    <div class="flex justify-center md:justify-start flex-wrap gap-3 my-4">
      {skills.map((skill) => <Skill key={skill.skill} {...skill} />)}
    </div>
  );
}

function Skill({ source, skill }: Props) {
  return (
    <div className="flex flex-row shadow-md items-center dark:shadow-2xl rounded-lg">
      <i className="p-2">
        <img width={32} height={32} src={source} alt="css-logo" />
      </i>
      <span className="text-sm mr-4 leading-normal">
        <h5 className="font-bold dark:text-white">{skill}</h5>
      </span>
    </div>
  );
}

export default Skills;
