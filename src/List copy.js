import React from 'react';

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
    }
    dragEnd(e) {
        this.dragged.style.display = 'block';

        e.target.classList.remove("drag-up");
        this.over.classList.remove("drag-up");

        e.target.classList.remove("drag-down");
        this.over.classList.remove("drag-down");


        var colors = this.state.colors;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        colors.splice(to, 0, colors.splice(from, 1)[0]);

        //set newIndex to judge direction of drag and drop
        colors = colors.map((doc, index) => {
            doc.newIndex = index + 1;
            return doc;
        })

        this.setState({ colors: colors });
    }

    dragOver(e) {
        e.preventDefault();

        this.dragged.style.display = "none";

        if (e.target.tagName !== "LI") {
            return;
        }

        //判断当前拖拽target 和 经过的target 的 newIndex

        const dgIndex = JSON.parse(this.dragged.dataset.item).newIndex;
        const taIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";


        if (this.over && e.target.dataset.item !== this.over.dataset.item) {
            this.over.classList.remove("drag-up", "drag-down");
        }

        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            this.over = e.target;
        }
    }
    render() {
        var listItems = this.state.colors.map((item, i) => {
            return (
                <li
                    data-id={i}
                    key={i}
                    style={{ height: "60px", border: "solid 1px #cccccc", margin: "10px 30%", borderRadius: "5px", backgroundColor: "green", color: "#ffffff" }}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                    data-item={JSON.stringify(item)}
                >{item.color}</li>
            )
        });
        return (
            <ul onDragOver={this.dragOver.bind(this)} className="contain">
                {listItems}
            </ul>
        )
    }
}