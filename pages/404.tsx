import Link from "next/link";
import React from "react";

type Props = {};

const FourOhFour = (props: Props) => {
  return (
    <div>
      <h2>404 - CHANNEL NOT FOUND</h2>
      <p>
        RETURN TO <Link href={'/'} passHref><span className='link clickable'>CHANNEL 01</span></Link>
      </p>
    </div>
  );
};

export default FourOhFour;
