import React from "react";

export const Form = ({children, url, data}, event) => {

   const submit = () => {
       fetch(`${url}`, {
           method: "POST",
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
       }).then((res) => {
           console.log(res);
           return res.json()
       }).catch((err) => {
           console.log(err);
       })

       event.preventDefault();
   }

    return (
        <form onSubmit={submit}>
            {children}      
        </form>
    )
}


export const Button = ({ title }) => {
     return (
        <button type="submit">{title}</button>
     )
}



export const Field = ({ height, width, borderRadius, backgroundColor, borderColor, borderWidth, name, type, value, onChange }) => {

    return (
          <>
           <input style={{ height: height, width: width, borderRadius: borderRadius, backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth }} 
           name={name} type={type} value={value} onChange={onChange}/>
           {/*<p style={{ color: "red" }}>{error}</p>*/}
           </>
        )
    }