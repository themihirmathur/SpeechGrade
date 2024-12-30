const Card = ({ cName}) => {
  return (
    <div className=" cursor-pointer text-purple-500" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ddd',
      borderRadius: '20px',
      margin: '20px',
      padding: '20px',
      boxShadow: '0 10px 20px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
    }}>
      <h2 style={{  // dark purple text
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
        {cName}
      </h2>
      
     
    </div>
  );
};

export default Card;