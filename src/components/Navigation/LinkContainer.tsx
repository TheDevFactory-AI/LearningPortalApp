import { Link } from "@tanstack/react-router"

type LinkProps={
    to:string,
    title:string,
    disabled?:boolean
}
const LinksContainer = ({links}:{links:LinkProps[]}) => {
  return (
    links.map((link, index)=>{
        return(
        <div className="pb-4" key={index}>
          <div className="w-[200px] pl-4 border-none rounded hover:${link.disabled ? 'opacity-50 cursor-not-allowed' : ''}">
            <Link to={link.to} className="[&.active]:font-bold text-white" disabled={link.disabled}>
              {link.title}
            </Link>
          </div>
        </div>
        )

    }
  ))
}

export default LinksContainer