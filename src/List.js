import React, { useState } from 'react';

export const List = ({ allColors }) => {

    let [colors, setColors] = useState(allColors);
    const [dragged, setDragged] = useState(null);
    let [over, setOver] = useState(null);

    const dragStart = (e) => {
        setDragged(e.currentTarget)
    }

    const dragEnd = (e) => {
        dragged.style.display = 'block';
        setDragged(dragged)


        e.target.classList.remove("drag-up");
        over.classList.remove("drag-up");

        e.target.classList.remove("drag-down");
        over.classList.remove("drag-down");

        var from = Number(dragged.dataset.id);
        var to = Number(over.dataset.id);
        colors.splice(to, 0, colors.splice(from, 1)[0]);

        //set newIndex to judge direction of drag and drop
        colors = colors.map((doc, index) => {
            doc.newIndex = index + 1;
            return doc;
        })

        setColors(colors)
    }

    const dragOver = (e) => {
        e.preventDefault();

        dragged.style.display = "none";

        if (e.target.tagName !== "LI") {
            return;
        }

        //判断当前拖拽target 和 经过的target 的 newIndex

        const dgIndex = JSON.parse(dragged.dataset.item).newIndex;
        const taIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";


        if (over && e.target.dataset.item !== over.dataset.item) {
            over.classList.remove("drag-up", "drag-down");
        }

        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            over = e.target;
        }
    }

    return (
        <ul onDragOver={(e) => dragOver(e)} className="contain">
            {colors.map((item, i) => {
                return (
                    <li
                        data-id={i}
                        key={i}
                        style={{ height: "60px", border: "solid 1px #cccccc", margin: "10px 30%", borderRadius: "5px", backgroundColor: "green", color: "#ffffff" }}
                        draggable='true'
                        onDragEnd={e => dragEnd(e)}
                        onDragStart={e => dragStart(e)}
                        data-item={JSON.stringify(item)}
                    >{item.color}</li>
                )
            })}
        </ul>
    )

}