import { useTranslations } from 'next-intl';
import React from 'react'

const Hero = () => {
    const t = useTranslations('Hero');
    return (
        <div>
            <section className="body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <div className='font-medium'>
                            <p className='inline-block text-start text-[#145855] text-3xl sm:text-5xl border-b-4 mb-4 border-[#145855] dark:text-[#52A742] dark:border-[#52A742]'>Salatri.</p>
                            <p className="sm:text-4xl text-3xl">{t('title')}</p>
                        </div>
                        <p className="mt-8 text-lg leading-relaxed">{t('description')}</p>

                    </div>
                    {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                    </div> */}
                    <div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6 flex flex-wrap">
                        <div className="md:p-2 p-1 w-1/2">
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/500x300" />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/501x301" />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://dummyimage.com/600x360" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero