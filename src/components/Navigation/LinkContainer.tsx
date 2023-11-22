import { Link } from "@tanstack/react-router"

type LinkProps={
    to:string,
    title:string,
}
const LinksContainer = ({links}:{links:LinkProps[]}) => {
  return (
    links.map((link)=>{
        return(
        <div className="pb-4">
        <Link to={link.to} className="[&.active]:font-bold text-white">
          {link.title}
        </Link>
        </div>
        )

    }
  ))
}

export default LinksContainer