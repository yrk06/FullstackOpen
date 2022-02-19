const DisplayLine = ({country, setActive})=> {
    const setThisActive = ()=>{
        setActive(country)
    }
    return (<li>{country.name.common} <button onClick={setThisActive}>Show</button></li>)
}

const DisplayResults = ({results, setActive})=> {

    if(results.length === 0){
        return (
            <div>No results for the filter</div>
        )
    } else if (results.length > 10){
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (results.length === 1){
        return <div></div>
    } else {
        return (
            <ul>
                {results.map(el => <DisplayLine key={el.name.common} country={el} setActive={setActive}/>)}
            </ul>
        )
    }
    
}


export default DisplayResults