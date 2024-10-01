import "./gridService.css"
import data from './data'

const gridService = () => {
  return (
    <div className="gridService">
      <h1 className="primaryText">Nos service</h1>
      <div className="gr-contrainer">
        {
          data.map((item, i) => {
            // const [className,setClassName] =useState(null);
            return (
              <>
                <div className="column" key={i}>
                  <div className="card">
                    <div className="icon">{item.icon}</div>
                    <h3>{item.heading}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              </>
            )
          }
          )
        }




      </div>
    </div>
  )
}

export default gridService
