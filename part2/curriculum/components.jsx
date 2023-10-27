const Total = ({ sum }) => {
  return <h4>Total exercices {sum}</h4>;
};

const Part = ({ name, exercises, id, sum }) => {
  return (
    <>
      <div>
        <p key={id}>
          {name} {exercises}
        </p>
      </div>
    </>
  );
};

const Content = ({ name, id, info }) => {
  const sum = info.reduce((acc, value) => acc + value.exercises, 0);

  return (
    <div>
      <h3 key={id}>{name}</h3>
      <>
        {info.map((value) => {
          return (
            <div>
              <div>
                <Part
                  name={value.name}
                  exercises={value.exercises}
                  id={value.id}
                />
              </div>
            </div>
          );
        })}
      </>
      <Total sum={sum} />
    </div>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Course = ({ courses }) => {
  const title = "Web development curriculum";
  return (
    <div>
      <Header title={title} />
      <>
        {courses.map((course) => {
          return (
            <>
              <Content name={course.name} id={course.id} info={course.parts} />
            </>
          );
        })}
      </>
    </div>
  );
};

export { Course, Content, Header, Part, Total };
