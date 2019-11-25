import React from 'react';
import logo1 from './react.svg';
// import * from './images/*';
import './App.css';
import ChartViewer from './ChartViewer';
import ChartViewer1 from './ChartViewer1';
import ChartViewer2 from './ChartViewer2';
import ChartViewer3 from './ChartViewer3';
import ChartViewer4 from './ChartViewer4';


function App() {
  return (
    <div className="App" style={{height:'100vh'}}>
     
      <header className="App-header">
         < div style={{width:'80%',margin:'0 auto'}}>
           <
           h2 style = {
             {
               color: 'white'
             }
           } > Ad serving analysis.</h2> 
           </div>
        < img src = {
          logo1
        }
        className = "App-logo"
        alt = "ReactJs" / >
      < img src = {
        require('./images/fusioncharts.jfif')
      }
      className = "App-logo"
      alt = "FusionCharts" / >
      
        < img src = {
          require('./images/python.png')
        }
        className = "App-logo"
        alt = "Python" / >
      < img src = {
        require('./images/flask.jfif')
      }
      className = "App-logo"
      alt = "Flask" / >
        < img src = {
          require('./images/pandas.png')
        }
        className = "App-logo"
        alt = "Pandas" / >
        <hr/>
        <div style={{float:'left'}}>
        < ChartViewer1 / >
        </div>
        <div style={{float:'right'}}>
        < ChartViewer2 compaignid='916' / >
        < ChartViewer2 compaignid = '936' / >
        < ChartViewer2 compaignid = '1178' / >
        </div>
        <div style={{clear:'both'}}></div>
        {/* <hr / > */}
        < div style = {
          {
            float: 'left'
          }
        } >
        < ChartViewer3 / >
        </div>
       
          < div style = {
              {
                float: 'right'
              }
            } >
            <ChartViewer4 / >
            </div> <div style = {
              {
                clear: 'both'
              }
            } > </div> 
            {/* <hr / > */}
        {/* < ChartViewer / > */}
        <hr/>
        < div style={{fontSize:'1rem'}}> Created by LiQi;
        Reference: https: //www.fusioncharts.com/</div>
      </header>
    </div>
  );
}

export default App;
