import { StyledThumbnail } from "baseui/card";

export default({images}) => {
	const components = images.map((image, index)=>{
		const { url } = image;
	    return <StyledThumbnail
	       src={url}
		   key={index}
	     />

	});
	return components;
}