import { useState, useEffect } from "react"

import Layout from "../../components/Layout/Layout"
import styles from './Country.module.css'

const neighCountries = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

    const country = await res.json()
    return country
}

const Country = ({country}) => {
    // console.log(country)
    const [borders, setBorders] = useState([])
    
    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map((border) => neighCountries(border))
        )
        setBorders(borders)
    }

    useEffect(() => {
        getBorders()
    }, [])

    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.contLeft}>
                <div className={styles.overviewPanel}>
                    <img src={country.flag} alt={country.name} />
                    
                    <h1 className={styles.overviewName}>{country.name}</h1>
                    <div className={styles.overviewRegion}>{country.region}</div>

                    <div className={styles.overviewNumber}>
                        <div className={styles.overviewPop}>
                            <div className={styles.overviewValue}>{country.population}</div>
                            <div className={styles.overviewLabel}>Population</div>
                        </div>
                        <div className={styles.overviewArea}>
                            <div className={styles.overviewValue}>{country.area}</div>
                            <div className={styles.overviewLabel}>Area</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contRight}>
                <div className={styles.detailPanel}>
                    <h4 className={styles.detailPanelHead}>Details</h4>
                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>Capital</div>
                        <div className={styles.detailPanelValue}>{country.capital}</div>
                    </div>

                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>SubRegion</div>
                        <div className={styles.detailPanelValue}>{country.subregion}</div>
                    </div>

                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>Language</div>
                        <div className={styles.detailPanelValue}>{country.languages.map(({name}) => name).join(", ")}</div>
                    </div>

                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>Currency</div>
                        <div className={styles.detailPanelValue}>{country.currencies.map(({name}) => name).join(", ")}</div>
                    </div>

                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>Native name</div>
                        <div className={styles.detailPanelValue}>{country.nativeName}</div>
                    </div>

                    <div className={styles.detailPanelRow}>
                        <div className={styles.detailPanelLabel}>Gini</div>
                        <div className={styles.detailPanelValue}>{country.gini}%</div>
                    </div>

                    <div className={styles.detailPanelBorders}>
                        <div className={styles.detailPanelBorderLabels}>Neighbour Countries</div>
                        <div className={styles.detailPanelBorderContainer}>
                            {borders.map(({flag, name}) => <div className={styles.detailPanelBorderCountries}>
                                <img src={flag} alt={name} />
                                <div className={styles.detailPanelBorderNames}>{name}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Country

export const getServerSideProps = async ({params}) => {
    const country = await neighCountries(params.id)
    return {
        props: {
            country,
        }
    }
}