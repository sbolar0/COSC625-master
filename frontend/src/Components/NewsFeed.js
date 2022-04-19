import React, { useState, useEffect } from 'react';
import styles from '../Styles/Components/NewsFeed.module.css'


export default function NewsFeed() {
    const[contentLoaded, setLoaded] = useState(false)
    const [articles, setArticles] = useState([])

    // fetch news on load.
    useEffect(() => {
        if(contentLoaded){
            function newRow(article){

                //check for images, if none, skip article
                var rand_urls = [
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/stock-market-gba8c982db_1920.jpg",
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/trade_the_bitcoin_stock_market_on_smartphone__converted_.jpg",
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/stock-market-chart-virtual-screen-with-woman-s-hand-digital-remix.jpg",
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/stock-market-6287711_1920_11.jpg",
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/wall-street-gbd3103d45_1920_0.jpg",
                "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2012/contributors_6.png"
                ]

                // make new row
                var tbodyRef = document.getElementById('newsTable').getElementsByTagName('tbody')[0]
                var newRow = tbodyRef.insertRow()
                
                // image
                var thumbNail = newRow.insertCell()
                var imgContainer = document.createElement('div')
                imgContainer.className = styles.imageDiv
                var img = document.createElement('img')
                if(!article.images[2]){
                    img.src = rand_urls[(Math.floor(Math.random() * 6))]
                }
                else{img.src = article.images[2].url} 
                imgContainer.appendChild(img)
                thumbNail.appendChild(imgContainer)

                // headline
                var headline = newRow.insertCell()
                var a = document.createElement('a')
                a.href = article.url 
                a.target = "_blank"
                a.className = styles.headLineLink
                var headLineCont = document.createElement('div')
                headLineCont.className = styles.headLine
                headLineCont.innerHTML=article.headline                
                a.appendChild(headLineCont)
                headline.appendChild(a)

            }
            
            articles.forEach(article => {
                newRow(article)
                });    
        }
    },[contentLoaded, articles])

    // fetch news on load.
    useEffect(() => {
        function getNews() {
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("x-api-key", "2fQzbCxpF9Eh3YGW3GZa")

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            }
            fetch("https://api.cameronzuziak.dev/news", requestOptions)
            .then(response => response.json())
            .then((response) => {
                setArticles(response)
                setLoaded(true)
            })
            .catch(error => console.log('error', error))
        } 
        getNews();
    },[]);

    return (
        <div className={styles.tableCont}>
            <span className={styles.title}><b>News Feed</b></span>
                <table id='newsTable' className={styles.newsTable}>
                    <thead>
                        <tr>
                            <th className={styles.firstColumn}></th>
                            <th className={styles.headLine}></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
        </div>
    )
}
