// Imports
import React from "react";

// Component
const Species = ({ name, language, averageLifespan }) => {

	// Return
	return(
		<li>
			{ name }
			<ul>
				<li>Language : { language }</li>
       			<li>Average lifespan : { averageLifespan }</li>
			</ul>
		</li>
	);

};

// Export
export default Species;