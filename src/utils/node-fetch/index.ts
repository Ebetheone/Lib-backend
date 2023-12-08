// import fetch, { RequestInit, HeadersInit, BodyInit } from "node-fetch"

type FetcherOptions = {
  url: string
  options?: RequestInit | undefined
}

type FetcherResults<T> = {
  res: T
}

export const fetcher = async <T>({
  url,
  options,
}: FetcherOptions): Promise<FetcherResults<T>> => {
  try {
    const res = await fetch(url, options)
    const resJson = await res.json()
    return { res: resJson as T }
  } catch (error) {
    console.log("--------FETCH.FETCHER.ERROR---------", error)
    throw new Error("Fetch fetcher Custom Error")
  }
}

type FetcherPostOptions = {
  url: string
  headers?: HeadersInit | undefined
  body?: BodyInit | undefined
}

export const post = async <T>({
  url,
  headers = undefined,
  body = undefined,
}: FetcherPostOptions): Promise<FetcherResults<T>> => {
  try {
    const options: RequestInit | undefined = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body || undefined,
      redirect: "follow",
    }
    if (headers) {
      options.headers = { ...options.headers, ...headers }
    }

    const res = await fetch(url, options)

    const resJson = await res.json()
    return { res: resJson as T }
  } catch (error) {
    console.log("--------FETCH.POST.ERROR---------", error)
    throw new Error("Fetch Post Custom Error")
  }
}

export const get = async <T>({
  url,
  headers = undefined,
  body = undefined,
}: FetcherPostOptions): Promise<FetcherResults<T>> => {
  try {
    const options: RequestInit | undefined = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body || undefined,
      redirect: "follow",
    }
    if (headers) {
      options.headers = { ...options.headers, ...headers }
    }

    const res = await fetch(url, options)

    const resJson = await res.json()
    return { res: resJson as T }
  } catch (error) {
    console.log("--------FETCH.GET.ERROR---------", error)
    throw new Error("Fetch Get Custom Error")
  }
}
