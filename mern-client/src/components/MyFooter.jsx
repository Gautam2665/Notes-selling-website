import React from 'react';
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const MyFooter = () => {
  return (
    <Footer container={true} className="bg-gray-900 text-gray-400 py-16">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <Footer.Title title="Company" className="text-gray-200" />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="hover:text-white">About</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Careers</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Brand Center</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Help Center" className="text-gray-200" />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="hover:text-white">Discord Server</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Twitter</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Facebook</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" className="text-gray-200" />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="hover:text-white">Privacy Policy</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Licensing</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Download" className="text-gray-200" />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="hover:text-white">iOS</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Android</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">Windows</Footer.Link>
              <Footer.Link href="#" className="hover:text-white">MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-800 mt-12 px-6 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="StudySync™" year={2024} className="text-gray-500" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-gray-400 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-gray-400 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-gray-400 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsGithub} className="text-gray-400 hover:text-white transition-colors" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-gray-400 hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default MyFooter;
