const app = document.getElementById('app')
const stories = document.getElementById('stories')
const behindButton = document.getElementById('behind')
const forwardButton = document.getElementById('forward')
const storyContainer = document.getElementById('story--content')
const closeIcon = document.getElementById('close')
const contentImage = document.getElementById('img-story')
const InsideBar = document.getElementById('bar-inside')
let intervalID;

const getRandom = (max = 150000) =>{
    return Math.floor(Math.random() * max)
 }
const getPhotos = () =>{
    fetch("https://picsum.photos/v2/list?page=2&limit=15")
    .then(res=>res.json())
    .then(res=>{
        const fragment = document.createDocumentFragment()
        res.forEach(element => {
            const post = document.createElement('div')
            post.classList.add('post')
            //TOP BAR
            const postTop = document.createElement('section')
            postTop.classList.add('post-top')
            post.appendChild(postTop)

            const postTopInfo  = document.createElement('div')
            postTopInfo.classList.add('post-top--info')
            postTop.appendChild(postTopInfo)

            const postTopIcon = document.createElement('img')
            postTopIcon.classList.add('post-top--icon')
            postTopIcon.src = '/1-webpack/src/assets/icon.jpg'
            postTopInfo.appendChild(postTopIcon)

            const postTopText = document.createElement('div')
            postTopInfo.appendChild(postTopText)

            const userName = document.createElement('p')
            userName.textContent = element.author
            userName.classList.add('user-name')
            postTopText.appendChild(userName)

            const userUbication = document.createElement('p')
            userUbication.textContent = "Akatsuki's Cave"
            userUbication.classList.add('user-ubication')
            postTopText.appendChild(userUbication)

            const threeDots = document.createElement('img')
            threeDots.classList.add('flex-left')
            threeDots.src = '/1-webpack/src/assets/bx-dots-horizontal-rounded.svg'
            postTopInfo.appendChild(threeDots)

            //PHOTO SECTION
            const postPhoto = document.createElement('section')
            postPhoto.classList.add('post-photo')
            post.appendChild(postPhoto)

            const spinner = document.createElement('div')
            spinner.classList.add('spinner')
            spinner.classList.add('spinner--animation')
            postPhoto.appendChild(spinner)

            const postPhotoItem = document.createElement('img')
            postPhotoItem.src = element.download_url
            postPhotoItem.classList.add('post-photo--item')
            postPhotoItem.classList.add('blur--animation')
            postPhoto.appendChild(postPhotoItem)
            postPhotoItem.addEventListener('load', (e) =>{
                if(postPhotoItem.classList.contains('blur--animation')){
                    postPhotoItem.classList.remove('blur--animation')
                    spinner.classList.remove('spinner--animation')
                    spinner.classList.add('disappear')
                }
            })

            //POST INTERACTION ZONE
            const postLikeZone = document.createElement('section')
            postLikeZone.classList.add('post__like-zone')
            post.appendChild(postLikeZone)

            const heartIcon = document.createElement('img')
            heartIcon.src = '/1-webpack/src/assets/bx-heart.svg'
            postLikeZone.appendChild(heartIcon)
            heartIcon.dataset.like = 'not-liked'
            heartIcon.addEventListener('click', () =>{
                if(heartIcon.dataset.like == 'not-liked'){
                    heartIcon.src = '/1-webpack/src/assets/bxs-heart-filled.svg'
                    heartIcon.dataset.like = 'liked'
                } else {
                    heartIcon.src = '/1-webpack/src/assets/bx-heart.svg'
                    heartIcon.dataset.like = 'not-liked'
                }
            })

            const commentIcon = document.createElement('img')
            commentIcon.src = '/1-webpack/src/assets/bx-comment.svg'
            commentIcon.classList.add('flex-comment')
            postLikeZone.appendChild(commentIcon)

            const planeIcon = document.createElement('img')
            planeIcon.src = '/1-webpack/src/assets/bx-paper-plane.svg'
            postLikeZone.appendChild(planeIcon)

            const bookmarIcon = document.createElement('img')
            bookmarIcon.src = '/1-webpack/src/assets/bx-bookmark.svg'
            bookmarIcon.classList.add('flex-left')
            postLikeZone.appendChild(bookmarIcon)

            //COUNTS OF LIKES AND COMMNETS
            const countLikes = document.createElement('p')
            countLikes.textContent = `Liked by ${getRandom()} people`
            post.appendChild(countLikes)

            const countComments = document.createElement('p')
            countComments.textContent = `View All ${getRandom(1500)} comments`
            countComments.classList.add('grey-text')
            post.appendChild(countComments)

            
            fragment.appendChild(post)
        });
        app.appendChild(fragment)
        setObserver()
    })
}

const callback = (entries) =>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            getPhotos()
        }
    })
}

const setObserver = () =>{
    const options = {
        threshold: 0.25
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(app.lastElementChild)
}

const storyList = () =>{
    fetch('https://picsum.photos/v2/list?page=5&limit=10')
     .then(res=>res.json())
      .then(res=> {
          const fragment = document.createDocumentFragment()
          res.forEach(response => {
            const storyItem = document.createElement('div')
            storyItem.classList.add('story--item')
            storyItem.classList.add('translate-story')
            storyItem.draggable = true
            stories.appendChild(storyItem)

            const storyImage = document.createElement('img')
            storyImage.src = response.download_url
            storyImage.classList.add('story-img')
            storyItem.appendChild(storyImage)

            const storyText = document.createElement('p')
            storyText.textContent = response.author
            storyText.classList.add('story-text')
            storyItem.appendChild(storyText)

            fragment.appendChild(storyItem)
        });
        stories.appendChild(fragment)
        const storyItems = document.querySelectorAll('.story--item')
        storyMovement(storyItems)
        storyContent(storyItems)
    })
}

const storyMovement = (storyItems) =>{
    stories.addEventListener('dragend', (e) =>{
        storyItems.forEach(element =>{
                element.style.transform = `translateX(${e.offsetX}%)`
        })
    })
}

const storyContent = (content) =>{
    const imageContent = document.createElement('img')
    content.forEach((element, index, array)=>{
        element.addEventListener('click', (e) =>{
            console.log(e.target);
            let currentIndex = index
            if(e.target.classList.contains('story-img')){
                intervalID = setInterval(() =>{
                    if(currentIndex > array.length - 1){
                        currentIndex = 0
                    } else if (currentIndex < 0){
                        currentIndex = array.length - 1
                    }

                imageContent.src = array[currentIndex].children[0].src
                imageContent.classList.add('content__img--item')
                storyContainer.classList.remove('no-display')
                InsideBar.classList.add('time-bar--animation')
                contentImage.appendChild(imageContent)
                currentIndex++
                }, 5000)
            }   
        })
        closeIcon.addEventListener('click', (e) =>{
            if(e.target.classList.contains('close--icon')){
                storyContainer.classList.add('no-display')
                InsideBar.classList.remove('time-bar--animation')
                clearInterval(intervalID)
            }
        })
    })
}

storyList()
getPhotos()