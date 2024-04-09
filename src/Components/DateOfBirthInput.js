const DateOfBirthInput = ({ days, months, years})=>{
    const date = new Date()
    return(
        <div className="w-[96%]">
           
    <select className="rounded-md border bg-white p-2 outline-none w-[30%] ml-5" name="day" defaultValue={date.getDay()}>
    {days.map((day)=>(
        <option value={day} key={day} >{day}</option>
    ))}
    </select>
   
       <select className="rounded-md border bg-white p-2 outline-none w-[30%] ml-2 mr-2" name="month" defaultValue={date.getMonth()}>
       {months.map((month)=>(
        <option value={month} key={month}>{month}</option>
    ))}
    </select>
        <select className="rounded-md border bg-white p-2 outline-none w-[30%]" name="year" defaultValue={date.getFullYear()}>
        {years.map((year)=>(
         <option value={year} key={year}>{year}</option>
    ))}
    </select>
      </div>
    )
}
export default DateOfBirthInput