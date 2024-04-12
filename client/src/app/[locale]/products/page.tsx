import { useTranslations } from 'next-intl';
import React from 'react'

const Products = () => {
    const t = useTranslations('Index');

    return (
        <div>      <h1>{t('title')}</h1>
        </div>
    )
}

export default Products