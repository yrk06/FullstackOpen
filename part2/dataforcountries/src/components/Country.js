

const Country = ({country})=> {
    if(country === undefined){
        return (<div></div>)
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Area:</strong> {country.area}km<sup>2</sup></p>
            <p><strong>Languages:</strong></p>
            <ul>
                {Object.keys(country.languages).map((key, index) => {
                    return <li key={key}>{country.languages[key]}</li>
                    })}
            </ul>
            <p><strong>Flag:</strong></p>
            <img src={country.flags.png} alt="Bandeira"></img>
        </div>
        

    )

}


export default Country