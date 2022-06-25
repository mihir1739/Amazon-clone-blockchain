import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { AmazonContext } from '../context/AmazonContext'


function Cards() {

    const { assets } = useContext(AmazonContext);

    const item = {
        id: 0,
        attributes: {
            name: "Doge",
            price: 2,
            src: "https://images.unsplash.com/photo-1655705273978-3c5aae296870?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
        }
    }

    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center  flex-wrap gap-[80px]`,
    }
    console.log(" cards", assets);

    return (
        <div className={styles.container}>
            <div className={styles.title}>New Release</div>
            <div className={styles.cards}>
                {
                    assets.map((item, index) => {
                        return <Card key={item.id} item={item.attributes} />
                    })
                }

            </div>
        </div>
    )
}

export default Cards