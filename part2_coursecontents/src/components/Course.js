import React from 'react';
//import ReactDOM from 'react-dom';
//import '/Users/honey/Desktop/part2/part2_coursecontents/src/index.css';


const Course = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 0,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 1,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

      /*const sum =courses.map(({parts}) => {
          return parts.reduce((prev, {exercises}) => {
              return +prev['exercises']
          })
      })
      const total = parts => parts.reduce((prev,next) => prev+next);*/
    //let sum1 = a => a.reduce((x,y) => x+y);
   /*const total = courses.reduce((acc => {
        n2.parts.reduce((sum, part) => sum + part.exercises, 0)}));*/
       /* const sum = courses.reduce((acc, course) => {
            acc[course.name] = course.parts.reduce((acc, el) => acc + el.exercises, 0);
            return acc;
          }, {})*/
          const total = courses.map(item => {
            item = item.parts.reduce((sum, part) => sum + part.exercises, 0)
            return item;
          })
          
          console.log(total);

          
          
    
        
        return (
            <div>
                
                
                   
    {courses.map(n1 => (
    <div key={n1.id}>
            <ul>
              <li style={{fontWeight: "bold"}}>{n1.name}</li></ul>
              {n1.parts.map(part => (
    <ul key={part.id}>
        <li>{part.name} {part.exercises}</li>
        
        </ul>
        
              ))}
             
             <div>
                 
                 <ul key={n1.id}>
                 <li style={{fontWeight: "bold"}}>total of {total[n1.id]}exercises</li>
                </ul>
        
            </div>
              
              
              
              </div>   
               
           
         
    ))}
     
     
</div>

        )     
        
  
    
  }

  export default Course;
     
//ReactDOM.render(<Course />, document.getElementById('root'));

