import { useTranslations } from 'next-intl';
import React from 'react'

const Contacts = () => {
    const t = useTranslations('Index');

    return (
        <section className="text-gray-600 body-font relative h-[100vh]">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap  h-[100vh]">
                <div className="w-full bg-gray-300 rounded-lg overflow-hidden  p-10 flex items-end justify-start relative">
                    <iframe width="100%" height="100%" className="absolute inset-0" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.598541348!2d69.11455778327546!3d41.282479929776905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1712913443778!5m2!1sen!2sus" ></iframe>
                    <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                        <div className="lg:w-1/2 px-6">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                            <p className="mt-1">Tashkent Uzbekistan</p>
                        </div>
                        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                            <a className="text-indigo-500 leading-relaxed">isroildev@gmail.com</a>
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                            <p className="leading-relaxed">+998908171355</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts