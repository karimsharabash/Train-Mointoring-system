import React from "react";
import { MDBMask, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
  "mdbreact";

const CarouselPage = () => {
  return (
    <MDBContainer >
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                style={{ height: "400px", maxHeight: "400px"}}
                className="w-100"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/A32_approaching_Flemington_%28cropped%29.jpg/1024px-A32_approaching_Flemington_%28cropped%29.jpg"
                alt="First slide"
              />
              <MDBMask overlay="black-light" />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                style={{ height: "400px", maxHeight: "400px" }}

                className=" w-100"
                src="https://www.thetrainline.com/cmsmedia/cms/11224/france_train2_hero_2x.jpg"
                alt="Second slide"
              />
              <MDBMask overlay="black-light" />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className=" w-100"
                style={{ height: "400px", maxHeight: "400px"}}
                src="http://74f85f59f39b887b696f-ab656259048fb93837ecc0ecbcf0c557.r23.cf3.rackcdn.com//assets/library/image/e/original/elizabeth%20line%20test%20train%20passes%20through%20custom%20house%20station%20-%20april%202018_303104.jpg"
                alt="Third slide"
              />
              <MDBMask overlay="black-light" />

            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}
export default CarouselPage;

