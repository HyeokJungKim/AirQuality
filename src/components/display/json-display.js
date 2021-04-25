function JSONDisplay({temperatures}){
   return <div>
        <pre>
            {JSON.stringify(temperatures, null, 2)}
        </pre>
    </div>
}

export default JSONDisplay