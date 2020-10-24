import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Hello = require("../src/components/hello.bs").make;

export default function Home() {
  return (
      <Hello/>
  )
}