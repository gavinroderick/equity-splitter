import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const p1 = { name: "Gav", salary: 0, share: 0 };
  const p2 = { name: "Val", salary: 0, share: 0 };

  const [person1, setPerson1] = useState(p1);
  const [person2, setPerson2] = useState(p2);

  const calculateShare = (person, total) => {
    return ((person.salary / total) * 100).toFixed(2);
  };

  useEffect(() => {
    const total = person1.salary + person2.salary;
    setPerson1({
      ...person1,
      share: calculateShare(person1, total)
    });
    setPerson2({
      ...person2,
      share: calculateShare(person2, total)
    });
  }, [person1.salary, person2.salary]);

  return (
    <div className="App">
      <main className="card">
        <h1>Equitable Bill Splitter</h1>
        <Partner person={person1} setPerson={setPerson1} />
        <Partner person={person2} setPerson={setPerson2} />
        <SummarySection people={[person1, person2]} />
      </main>
    </div>
  );
}

const Partner = ({ person, setPerson }) => {
  return (
    <section className="partner">
      <h3>{person.name}</h3>
      <label htmlFor="parnter1-salary">Salary</label>
      <input
        name="partner1-salary"
        onChange={(event) =>
          setPerson({ ...person, salary: parseInt(event.target.value, 10) })
        }
      ></input>
    </section>
  );
};

const SummarySection = (props) => {
  return (
    <section className="summary">
      <h3>Summary</h3>
      {props.people.map((person) => {
        return (
          <p key={person.name}>
            {person.name}'s share: {person.share}%
          </p>
        );
      })}
    </section>
  );
};
