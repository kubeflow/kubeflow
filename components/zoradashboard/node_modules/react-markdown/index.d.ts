// TypeScript Version: 3.4

import {ElementType, ReactNode, ReactElement} from 'react'
import {PluggableList} from 'unified'
import * as unist from 'unist'
import * as mdast from 'mdast'

type Not<T> = {
  [key in keyof T]?: never
}

type MutuallyExclusive<T, U> = (T & Not<U>) | (U & Not<T>)

declare namespace ReactMarkdown {
  type Point = unist.Point

  type Position = unist.Position

  type NodeType = mdast.Content['type']

  type AlignType = mdast.AlignType

  type ReferenceType = mdast.ReferenceType

  type LinkTargetResolver = (uri: string, text: string, title?: string) => string

  type Renderer<T> = (props: T) => ElementType<T>
  interface Renderers {
    [key: string]: string | Renderer<any>
  }

  interface ReactMarkdownPropsBase {
    readonly className?: string
    readonly sourcePos?: boolean
    readonly includeNodeIndex?: boolean
    readonly rawSourcePos?: boolean
    readonly allowNode?: (node: mdast.Content, index: number, parent: NodeType) => boolean
    readonly linkTarget?: string | LinkTargetResolver
    readonly transformLinkUri?:
      | ((uri: string, children?: ReactNode, title?: string) => string)
      | null
    readonly transformImageUri?:
      | ((uri: string, children?: ReactNode, title?: string, alt?: string) => string)
      | null
    readonly renderers?: {[nodeType: string]: ElementType}
    readonly astPlugins?: PluggableList
    readonly plugins?: PluggableList
    readonly unwrapDisallowed?: boolean
  }

  interface SourceProp {
    /** @deprecated use children */
    readonly source: string
  }

  interface ChildrenProp {
    readonly children: string
  }

  interface AllowedTypesProp {
    readonly allowedTypes?: NodeType[]
  }

  interface DisallowedTypesProp {
    readonly disallowedTypes: NodeType[]
  }

  interface AllowDangerousHtmlProp {
    readonly allowDangerousHtml?: boolean
  }

  interface EscapeHtmlProp {
    /** @deprecated use allowDangerousHtml */
    readonly escapeHtml?: boolean
  }

  interface SkipHtmlProp {
    readonly skipHtml?: boolean
  }

  type ReactMarkdownProps = ReactMarkdownPropsBase &
    MutuallyExclusive<ChildrenProp, SourceProp> &
    MutuallyExclusive<AllowedTypesProp, DisallowedTypesProp> &
    MutuallyExclusive<EscapeHtmlProp, MutuallyExclusive<SkipHtmlProp, AllowDangerousHtmlProp>>

  const types: NodeType[]
  const renderers: Renderers
  function uriTransformer(uri: string): string
}

declare function ReactMarkdown(props: ReactMarkdown.ReactMarkdownProps): ReactElement

export = ReactMarkdown
