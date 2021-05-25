function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
 * React PDF to Image conversion
 * Used PDF.js External JavaScript library that renders Portable Document Format files
 * Convert PDF to HTML5 Canvas and get image url with base64 format
 */

/* Image componenet to render images and it works as child component */
const Image = props => {
  const source = props.page;
  const pageNumer = props.pageNumber;
  const style = {
    margin: "10px 5px 0px 5px" };

  const imgList =
  source &&
  source.map((image, index) => {
    return /*#__PURE__*/React.createElement("img", { src: image, style: style, key: index });
  });
  return /*#__PURE__*/React.createElement("div", null, imgList);
};

/* Coords component helps to generate the X and Y coordinates of the images */
const Coords = (event, pageNum, canvasEle) => {
  let x = event.offsetX;
  let y = event.offsetY;
  canvasEle.x = canvasEle.getBoundingClientRect().left;
  canvasEle.y = canvasEle.getBoundingClientRect().top;
  x = event.clientX - canvasEle.x;
  y = event.clientY - canvasEle.y;
  document.getElementById("page-number").innerText = pageNum;
  document.getElementById("x-coords").innerText = x;
  document.getElementById("y-coords").innerText = y;
};

/* ThumbImage component helps to create IMG element and disply with base64 URLs */
const ThumbImage = imgSrc => {
  const imgEle = document.createElement("img");
  imgEle.src = imgSrc;
  imgEle.width = "150";
  const imgContainer = document.getElementById("img-container");
  imgContainer.innerHTML = "";
  imgContainer.appendChild(imgEle);
};

/*
 * CanvasComponent component helps to create dynamic Canvas elements based of the number of PDF pages
 * This component generate image URLs from canvas
 * It containes events handling to get X and Y coordinates
 */
class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "updateCanvas",





























    () => {
      const viewport = this.page.getViewport(2.0);
      const canvas = this.canvasEle[this.pageNumber];
      const context = canvas.getContext("2d");
      const renderContext = {
        canvasContext: context,
        viewport: viewport };

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      this.page.render(renderContext);
    });this.page = this.props.page;this.pageNumber = this.props.pageNumber;this.canvasEle = [];this.imgEle = [];this.state = { images: [] };}componentDidMount() {this.updateCanvas();if (this.canvasEle[this.pageNumber]) {this.sidePanelEle = document.getElementById("mySidenav");this.canvasEle[this.pageNumber].addEventListener("click", e => {const imgUrl = this.canvasEle[this.pageNumber].toDataURL("image/jpeg");this.sidePanelEle.style.width = "250px";ThumbImage(imgUrl);Coords(e, this.pageNumber, this.canvasEle[this.pageNumber]);});document.getElementById("closeBtn").addEventListener("click", e => {this.sidePanelEle.style.width = 0;});}}componentWillUnmount() {if (this.canvasEle && this.canvasEle[this.pageNumber]) {this.canvasEle[this.pageNumber].removeEventListener();document.getElementById("closeBtn").removeEventListener();}}
  render() {
    return /*#__PURE__*/(
      React.createElement("canvas", {
        ref: e => this.canvasEle[this.pageNumber] = e,
        width: 300,
        height: 300 }));


  }}


/*
 * Pdf2Image component helps to convert PDF to Images with help of PDF.JS Lib.
 * It handles uploading file and read to send PDF.js
 * importing <CanvasComponent> here to render images
 */
class Pdf2Image extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleFileUpload",


















    file => {
      const that = this;
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const typedarray = new Uint8Array(this.result);
        PDFJS.getDocument(typedarray).then(pdf => {
          document.getElementById("mySidenav").style.width = 0;
          document.getElementById("convas-container").innerHTML = '';
          document.getElementById("total-page-number").innerText = pdf.numPages;
          let promise = Promise.resolve();
          for (let i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(page => {
              promise = promise.then(() => {
                that.renderCanvasPage(page, i);
              });
            });
          }
          Promise.resolve(promise);
        });
      };
      fileReader.readAsArrayBuffer(file);
    });_defineProperty(this, "renderCanvasPage",

    (page, pageNum) => {
      this.setState({
        canvases: [
        ...this.state.canvases, /*#__PURE__*/
        React.createElement(CanvasComponent, { page: page, pageNumber: pageNum })] });


    });this.state = { canvases: [] };}componentDidMount() {if (this.fileUpload) {this.fileUpload.addEventListener("change", e => {const file = e.target.files[0];if (file.type !== "application/pdf") {console.error(file.name, "is not a pdf file.");}this.handleFileUpload(file);document.getElementById("file-name").innerText = file.name;});}}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "Pdf2Image" }, /*#__PURE__*/
      React.createElement("div", { className: "file-container" }, /*#__PURE__*/
      React.createElement("input", {
        type: "file",
        id: "pdf-upload",
        ref: e => this.fileUpload = e })), /*#__PURE__*/


      React.createElement("div", { className: "convas-container", id: "convas-container" },
      this.state.canvases, /*#__PURE__*/
      React.createElement("div", { className: "contentDiv" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, )), /*#__PURE__*/
      React.createElement("p", null, ""), /*#__PURE__*/
      React.createElement("ul", null, /*#__PURE__*/
            React.createElement("li", null, /*#__PURE__*/
      React.createElement("ul", null, /*#__PURE__*/
      React.createElement("li", null, ""), /*#__PURE__*/
      React.createElement("li", null, ""), /*#__PURE__*/
      React.createElement("li", null, ""), /*#__PURE__*/
      React.createElement("li", null, "")))), /*#__PURE__*/



      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { className: "tech-div" }, /*#__PURE__*/
     
      React.createElement("p", null, /*#__PURE__*/React.createElement, )))), /*#__PURE__*/



      React.createElement("div", {
        id: "mySidenav",
        className: "sidenav",
        ref: e => this.mySidenav = e }, /*#__PURE__*/

      React.createElement("div", { className: "closebtn", id: "closeBtn" }, "\xD7"), /*#__PURE__*/


      React.createElement("div", { className: "slide-content", id: "slide-content" }, /*#__PURE__*/
      React.createElement("div", null, "NOME DO ARQUIVO PDF"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("span", { id: "file-name" })), /*#__PURE__*/

      React.createElement("div", null, "Total de Paginas : ", /*#__PURE__*/
      React.createElement("span", { id: "total-page-number" })), /*#__PURE__*/

      React.createElement("div", null, "Pagina Atual : ", /*#__PURE__*/
      React.createElement("span", { id: "page-number" })), /*#__PURE__*/

      React.createElement("div", null, "Coordenada X : ", /*#__PURE__*/
      React.createElement("span", { id: "x-coords" })), /*#__PURE__*/

      React.createElement("div", null, "Coordenada Y : ", /*#__PURE__*/
      React.createElement("span", { id: "y-coords" })), /*#__PURE__*/

      React.createElement("div", { id: "img-container" })))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Pdf2Image, null), document.getElementById("root"));