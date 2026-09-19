import Link from "next/link";

const FourOhFour = () => {
  return (
    <div>
      <h2>404 - CHANNEL NOT FOUND</h2>
      <p>
        RETURN TO <Link href={'/'}><span className='link clickable'>CHANNEL 01</span></Link>
      </p>
    </div>
  );
};

export default FourOhFour;
