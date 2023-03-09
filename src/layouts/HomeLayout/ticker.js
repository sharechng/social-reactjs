import React from 'react';
import './style.css';
import {Button} from "@material-ui/core";

function Ticker() {
return (
   
<>
<div style={{ display:'flex' , alignItems:'baseline'}}>
<nav className="menu">
<div className="menu__item">
<div className="marquee">
<div className="marquee__inner">
<span>Buy you domain name or else some will buy your domain name.</span>
<span>Buy you domain name or else some will buy your domain name.</span>
{/* <span>Buy you domain name or else some will buy your domain name.</span> */}
{/* <span>Showreel</span>
<span>Showreel</span>
<span>Showreel</span>
<span>Showreel</span>
<span>Showreel</span> */}

</div>
</div>
</div>

</nav>
<Button variant="contained"
                    color="secondary"
                    size="small" style={{marginLeft:'5%'}}>
                    Buy Now 
                  </Button>
                  </div>
</>
);
}

export default Ticker;





