import { toolkit } from "../portfolio-data";
export default function SoftwareTube() {
  return <div className="toolkit-list">{toolkit.map(([mark, name, detail], index) => <article className="sub-tool-row" key={name}><span className="sub-tool-mark">{mark}</span><div><h3>{name}</h3><p>{detail}</p></div><small>{String(index + 1).padStart(2, "0")}</small></article>)}</div>;
}
