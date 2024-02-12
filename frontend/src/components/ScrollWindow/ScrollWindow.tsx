"use client";
import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

function ScrollWindow() {
  return (
    <Layout contentMaxWidth="100ch">
      {/* Your other content */}
      <GalleryDiv galleryItemsAspectRatio="auto">
        <img src="/testImg1.jpeg" alt="test images" />
        <img src="/testImg3.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
        <img src="/testImg2.jpeg" alt="test images" />
      </GalleryDiv>
      {/* More of your content */}
    </Layout>
  );
}

export default ScrollWindow;
