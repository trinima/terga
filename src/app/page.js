'use client';

import { Widget as Chemistry } from "./chemistry/widget";
import { Widget as Comments } from "./comments/widget";

export default function Home() {
  return (<>
    <Chemistry />
    <Comments />
  </>);
}
