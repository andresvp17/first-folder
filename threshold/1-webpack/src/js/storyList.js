export const storyList = () =>{
    fetch('https://picsum.photos/v2/list?page=5&limit=10')
     .then(res=>res.json())
      .then(res=> console.log(res))
}