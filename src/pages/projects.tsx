import { useRouter } from "next/router";
import { useUrlHash } from "@/routing/use-url-hash";
import { projects } from "@/features/projects/projects.data";
import ProjectModal from "@/features/projects/project-modal/project-modal";
import ProjectTile from "@/features/projects/project-tile/project-tile";
import styles from "./projects.module.scss";

export default function ProjectPage() {
  const router = useRouter();
  const hash = useUrlHash();
  const selected = projects.find((item) => item.slug === hash);

  const select = (slug: string) => {
    void router.push({ pathname: router.pathname, query: router.query, hash: slug }, undefined, { scroll: false });
  };
  const close = () => {
    void router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false });
  };

  return (
    <>
      <div className={styles.projects}>
        {projects.map((item) => (
          <ProjectTile key={item.slug} project={item} href={`/projects#${item.slug}`} onOpen={() => select(item.slug)} />
        ))}
      </div>
      {selected && <ProjectModal key={selected.slug} project={selected} onClose={close} />}
    </>
  );
}
