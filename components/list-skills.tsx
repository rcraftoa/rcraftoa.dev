const path = "/skills";
const skills = [
  {
    skill: "Github",
    source: `${path}/github-svgrepo-com.svg`,
  },
  {
    skill: "Html",
    source: `${path}/html-svgrepo-com.svg`,
  },
  {
    skill: "Css",
    source: `${path}/css-svgrepo-com.svg`,
  },
  {
    skill: "Golang",
    source: `${path}/go-svgrepo-com.svg`,
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
    skill: `Javascript`,
    source: `${path}/javascript-svgrepo-com.svg`,
  },
  {
    skill: "Deno",
    source: `${path}/deno-svgrepo-com.svg`,
  },
  {
    skill: "React",
    source: `${path}/react-svgrepo-com.svg`,
  },
  {
    skill: "Vue",
    source: `${path}/vue-svgrepo-com.svg`,
  },
];
interface Props {
  source: string;
  skill: string;
}

function Skills() {
  return (
    <div class="flex justify-center md:justify-start flex-wrap gap-3 my-4">
      {skills.map((skill) => <Skill {...skill} />)}
    </div>
  );
}

function Skill({ source, skill }: Props) {
  return (
    <div className="flex flex-row shadow-md items-center dark:bg-[#ffffff10] dark:shadow-2xl bg-whipacity rounded-lg flex-row">
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
