

let m = new Map();
    m.set(1, 31);
    m.set(2, 29);
    m.set(3, 31);
    m.set(4, 30);
    m.set(5, 31);
    m.set(6, 30);
    m.set(7, 31);
    m.set(8, 31);
    m.set(9, 30);
    m.set(10, 31);
    m.set(11, 30);
    m.set(12, 31);
export const daysInMonth = m

const desc0 = "This panel explains the significance of your calculated color";
const desc1 = "Special meaning related to a color";
const desc2 = "Special meaning related to a color";
const desc3 = "Special meaning related to a color";
const desc4 = "Special meaning related to a color";
const desc5 = "Special meaning related to a color";
const desc6 = "Special meaning related to a color";
const desc7 = "Special meaning related to a color";
const desc8 = "Special meaning related to a color";
const desc9 = "Special meaning related to a color";
const desc11 = "Special meaning related to a color";
const desc22 = "Special meaning related to a color";

let cmap = new Map();
    cmap.set(0, {title: "__", bg: "grey", desc: desc0});
    cmap.set(1, {title: "Red", bg: "red", desc: desc1});
    cmap.set(2, {title: "Orange", bg: "orange", desc: desc2});
    cmap.set(3, {title: "Yellow", bg: "yellow", desc: desc3});
    cmap.set(4, {title: "Green", bg: "green", desc: desc4});
    cmap.set(5, {title: "Blue", bg: "blue", desc: desc5});
    cmap.set(6, {title: "Indigo", bg: "violet", desc: desc6});
    cmap.set(7, {title: "Purple / Violet", bg: "purple", desc: desc7});
    cmap.set(8, {title: "Pink / Beige / Brown", bg: "pink", desc: desc8});
    cmap.set(9, {title: "Pastels", bg: "olive", desc: desc9});
    cmap.set(11, {title: "Black / White", bg: "black", desc: desc11});
    cmap.set(22, {title: "Coral / Russet", bg: "coral", desc: desc22});
export const colorInfo = cmap


export const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
]
