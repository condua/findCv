import React from 'react';
import "./DetailEvent.scss";
import { useParams } from 'react-router-dom';
import event from "../../../data/event.json"
import Header from "./../../Header/Header";
import { ListGroup } from 'react-bootstrap';

function DetailEvent(){
   
    const { id } = useParams();
    let keyId = parseInt(id);
    const item = event.filter((item) => item.id === keyId);
    return (
        <div className = "detailevent">
        <Header/>
        <h1>Detail</h1>

        <div>
                            <img src={item[0].image} alt="a"></img>
                            <div className="flex font-mono font-extrabold text-5xl my-10 ">{item[0].name}</div>
                            <div className="flex justify-between font-serif text-lg">
                                <div className="flex">
                                    {item[0].time}
                                </div>
                                <div className="m-auto">ssss</div>
                            </div>
                            <div>
                                {item[0].content.blocks.map((block) => {
                                    if (block.type === "header") {
                                        return (
                                            <div
                                                className="my-5 font-bold text-3xl text-black"
                                                key={block.id}
                                            >
                                                {block.data.text}
                                            </div>
                                        )
                                    } else if (block.type === "paragraph") {
                                        return (
                                            <div
                                                className="my-3 font-normal text-md text-black"
                                                key={block.id}
                                            >
                                                {block.data.text}
                                            </div>
                                        )
                                    } else if (block.type === "list") {
                                        return (
                                            <ListGroup>
                                                {block.data.items.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                    {item}
                                                    </ListGroup.Item>
                                                ))}
                                                </ListGroup>
                                        )
                                    } else if (block.type === "image") {
                                        return (
                                            <img
                                                alt="aaa"
                                                className="rounded-2xl border-[1px] border-slate-300 "
                                                src={block.data.url}
                                            ></img>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
        </div>
    )
}

export default DetailEvent; 