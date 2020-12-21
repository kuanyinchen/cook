let url_string = window.location.href;
let url = new URL(url_string);
let id = url.searchParams.get('id');

axios.get('/api/1.0/video/single', { params: { id: id } }).then((res) => {
    let videoInfos = res.data;
    console.log(videoInfos);
    let classTitle = get('.single-post');
    let title = document.createElement('h3');
    title.innerHTML = videoInfos[0].title;
    classTitle.insertBefore(title, classTitle.childNodes[0]);
    //
    let video = document.createElement('video');
    video.setAttribute('class', 'img-fluid w-100 rounded');
    video.setAttribute('autoplay', '');
    video.setAttribute('width', '650');
    video.setAttribute('controls', '');
    video.setAttribute('muted', 'muted');
    video.setAttribute('id', 'videoPlayer');
    let source = document.createElement('source');
    source.setAttribute('type', 'video/mp4');
    source.src = videoInfos[0].videolink;
    video.appendChild(source);
    //

    classTitle.appendChild(video);
    //
    let p = document.createElement('p');
    p.innerText = videoInfos[0].description;
    get('.single-post').appendChild(p);
});

function get(selector) {
    return document.querySelector(selector);
}
