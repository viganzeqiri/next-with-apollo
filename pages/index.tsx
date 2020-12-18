import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import { format } from "date-fns";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism/xonokai";
import { print } from "graphql/language/printer";
import styles from "../styles/Home.module.css";

const ResumeQuery = gql`
  query ResumeQuery {
    bio {
      name
      tagline
      linkedin
      github
      email
      objective
    }

    positions {
      id
      title
      company
      location
      startDate
      endDate
      achivements
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(ResumeQuery);

  if (error) {
    return <span>Error...opss!!</span>;
  }

  if (loading) {
    return (
      <header className={styles.header}>
        <h1>Vigan Zeqiri</h1>
        <h2>Full stack developer</h2>
        <h2>Loading...</h2>
      </header>
    );
  }

  const { bio, positions } = data;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>{bio.name}</h1>
        <h2>{bio.tagline}</h2>
      </header>

      <div className={styles.split}>
        {/* left side */}
        <div className={styles.left}>
          <h2>Contact</h2>
          <p>
            <strong>Email</strong>{" "}
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </p>

          <p>
            <strong>LinkedIn</strong>{" "}
            <a href={bio.linkedin}>{bio.linkedin.replace("https://", "")}</a>
          </p>

          <p>
            <strong>GitHub</strong>{" "}
            <a href={bio.github}>{bio.github.replace("https://", "")}</a>
          </p>

          <SyntaxHighlighter language="graphql" style={prismStyle}>
            {print(ResumeQuery)}
          </SyntaxHighlighter>
        </div>

        {/* right side */}
        <div className={styles.right}>
          <h2>Objective</h2>
          <p>{bio.objective}</p>

          <h2>Experience</h2>
          {positions.map((position) => {
            const length = [
              position.years > 0 ? `${position.years} yrs` : null,
              position.months > 0 ? `${position.months} mths` : null,
            ]
              .filter((item) => !!item)
              .join(" ");

            return (
              <div key={position.id}>
                <h3>{position.title}</h3>
                <p className={styles.light}>
                  {position.company} | {position.location}
                </p>
                <p className={styles.light}>
                  {format(new Date(position.startDate), "MMM yyyy")} -{" "}
                  {format(new Date(position.endDate), "MMM yyyy") || "Current"}{" "}
                  ({length})
                </p>
                <ul>
                  {position.achivements.map((acv) => (
                    <li key={acv}>{acv}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
