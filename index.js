function $(ele) {
    let nodeListOf = document.querySelectorAll(ele);
    if (nodeListOf.length === 1)
        return nodeListOf[0]
    return nodeListOf
}

const community = {
    images: [
        {
            title: "介绍",
            description: "点击一个您需要的版本按钮，然后再通过切换到最后一张图片下载应用。",
            url: "img/offine-4.png",
        },
        {
            title: "社区",
            description: "社区是用于分享规则的平台。\n在这里您可以上传自己编写的规则也可以下载其他创作者优秀的规则。",
            url: "img/community-1.webp",
        },
        {
            title: "通知",
            description: "这里您可以看到您的设备上当前和之前有什么通知。\n可以通过这里的通知快速创建规则。",
            url: "img/community-2.webp",
        },
        {
            title: "应用",
            description: "应用在通知过滤中是非常重要的存在。\n应用关联通知和规则，没了应用就不能正常使用。",
            url: "img/community-3.webp",
        },
        {
            title: "规则",
            description: "规则是由通知的匹配方式和动作组合而成。\n这两个结合在一起可以创建出无限的玩法。",
            url: "img/community-4.webp",
        },
    ],
    downloads: [
        {
            "name": "官方",
            "url": "https://notification-filter.oss-cn-guangzhou.aliyuncs.com/download/2.9.51/community.apk"
        },
        {
            "name": "酷安",
            "url": "https://www.coolapk.com/apk/top.webb_l.notificationfilter"
        },
        {
            "name": "GitHub",
            "url": "https://github.com/Webb-L/NotificationFilterAndroid/releases"
        },
    ]
}

const offline = {
    images: [
        {
            title: "介绍",
            description: "点击一个您需要的版本按钮，然后再通过切换到最后一张图片下载应用。",
            url: "img/offine-4.png",
        },
        {
            title: "通知",
            description: "这里您可以看到您的设备上当前和之前有什么通知。\n可以通过这里的通知快速创建规则。",
            url: "img/offine-1.webp",
        },
        {
            title: "应用",
            description: "应用在通知过滤中是非常重要的存在。\n应用关联通知和规则，没了应用就不能正常使用。",
            url: "img/offine-2.webp",
        },
        {
            title: "规则",
            description: "规则是由通知的匹配方式和动作组合而成。\n这两个结合在一起可以创建出无限的玩法。",
            url: "img/offine-3.webp",
        },
    ],
    downloads: [
        {
            "name": "官方",
            "url": "https://notification-filter.oss-cn-guangzhou.aliyuncs.com/download/2.9.51/offine.apk"
        },
        {
            "name": "Google Play(待上传)",
            "url": ""
        },
        {
            "name": "GitHub",
            "url": "https://github.com/Webb-L/NotificationFilterAndroid/releases"
        },
    ]
}

let carousel = community
let index = 0

const prevButton = $("#prev");
const nextButton = $("#next");
const carouselContainer = $("#carouselContainer");
const carouselIndex = $("#carouselIndex");

const communityEle = $("#community")
const offlineEle = $("#offline")

const title = $("#title")
const description = $("#description")

communityEle.onclick = () => {
    communityEle.className = "active"
    offlineEle.className = ""
    carousel = community
    if (carousel.images.length < index) {
        index = carousel.images.length
    }
    initView()
}
offlineEle.onclick = () => {
    offlineEle.className = "active"
    communityEle.className = ""
    carousel = offline
    if (carousel.images.length < index) {
        index = carousel.images.length
    }
    initView()
}


initView();

prevButton.onclick = function () {
    index--
    if (index <= -1) {
        index = carouselContainer.children.length - 1
    }

    setCarouselIndex()
}

nextButton.onclick = function () {
    index++
    if (index >= carouselContainer.children.length) {
        index = 0
    }

    setCarouselIndex();
}

carouselIndex.childNodes.forEach((ele, eleIndex) => {
    ele.onclick = function () {
        index = eleIndex
        setCarouselIndex();
    }
})

function setCarouselIndex() {
    title.innerText = ""
    description.innerText = ""
    if (index < carousel.images.length) {
        title.innerText = carousel.images[index].title
        description.innerText = carousel.images[index].description
    }

    carouselIndex.childNodes.forEach((ele, eleIndex) => {
        if (eleIndex === index) {
            ele.classList = "active"
        } else {
            ele.classList = ""
        }
    })

    carouselContainer.scrollLeft = carouselContainer.children[0].offsetWidth * index
}

function initView() {
    carouselContainer.innerHTML = ""
    carouselIndex.innerHTML = ""

    carousel.images.forEach(item => {
        const img = document.createElement("img")
        img.src = item.url
        carouselContainer.appendChild(img)

        const li = document.createElement("li")
        carouselIndex.appendChild(li)
    })
    const li = document.createElement("li")
    li.innerText = "&"
    carouselIndex.appendChild(li)

    const downloadContainer = document.createElement("div")
    const downloadButtons = document.createElement("div")

    carousel.downloads.forEach(button => {
        const downloadButton = document.createElement("button")
        downloadButton.innerText = button.name
        downloadButton.onclick = () => location.href = button.url
        downloadButtons.appendChild(downloadButton)
    })

    downloadContainer.appendChild(downloadButtons)
    carouselContainer.appendChild(downloadContainer)


    setCarouselIndex()
}