import { useRouter } from "next/router";
import { useUrlHash } from "@/routing/use-url-hash";
import { workExperience } from "@/features/work/work.data";
import WorkModal from "@/features/work/work-modal/work-modal";
import WorkTile from "@/features/work/work-tile/work-tile";
import styles from "./work.module.scss";

export default function WorkPage() {
  const router = useRouter();
  const hash = useUrlHash();
  const selected = workExperience.find((item) => item.slug === hash);

  const select = (slug: string) => {
    void router.push({ pathname: router.pathname, query: router.query, hash: slug }, undefined, { scroll: false });
  };
  const close = () => {
    void router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false });
  };

  return (
    <>
      <div className={styles.container}>
        {workExperience.map((item) => (
          <WorkTile key={item.slug} work={item} href={`/work#${item.slug}`} onOpen={() => select(item.slug)} />
        ))}
      </div>
      {selected && <WorkModal key={selected.slug} work={selected} onClose={close} />}
    </>
  );
}
