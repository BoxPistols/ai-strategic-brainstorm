import React, { useState } from 'react'
import { Download, FileText, Printer, X, Eye, ArrowLeft } from 'lucide-react'
import { RichText } from '../results/RichText'
import { dlFile } from '../../utils/report'
import { T } from '../../constants/theme'

interface PreviewProps {
    md: string
    pn: string
    onClose: () => void
}

type ExportPane = { type: 'md'; content: string } | { type: 'txt'; content: string } | null

export const PreviewModal: React.FC<PreviewProps> = ({ md, pn, onClose }) => {
    const txt = md
        .replace(/\*\*/g, '')
        .replace(/#{1,3}\s/g, '■ ')
        .replace(/\|/g, ' | ')
        .replace(/---/g, '──────')

    const [exportPane, setExportPane] = useState<ExportPane>(null)

    const doPrint = () => {
        const w = window.open('', '_blank')
        if (!w) return
        w.document.write(
            `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${pn}</title><style>body{font-family:-apple-system,'Hiragino Sans',sans-serif;max-width:780px;margin:32px auto;padding:0 20px;color:#1a1a1a;line-height:1.8;font-size:13px}pre{white-space:pre-wrap;font-family:inherit}@media print{body{margin:16px}}</style></head><body><pre>${txt}</pre></body></html>`,
        )
        w.document.close()
        setTimeout(() => w.print(), 300)
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
        >
            <div
                className={`${T.card} w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between px-4 py-2.5 border-b ${T.div} shrink-0`}
                >
                    <div className='flex items-center gap-2'>
                        {exportPane ? (
                            <button
                                onClick={() => setExportPane(null)}
                                className={`flex items-center gap-1 text-xs ${T.t3} hover:text-slate-600 dark:hover:text-slate-300`}
                            >
                                <ArrowLeft className='w-3.5 h-3.5' />
                                戻る
                            </button>
                        ) : (
                            <>
                                <Eye className='w-4 h-4 text-blue-500' />
                                <span className={`text-sm font-semibold ${T.t1}`}>
                                    プレビュー
                                </span>
                            </>
                        )}
                        {exportPane && (
                            <span className={`text-sm font-semibold ${T.t1}`}>
                                {exportPane.type === 'md' ? 'Markdown' : 'テキスト'} 確認
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-lg ${T.btnGhost}`}
                    >
                        <X className='w-4 h-4' />
                    </button>
                </div>

                {/* Body */}
                <div className='flex-1 overflow-y-auto p-4'>
                    {exportPane ? (
                        <>
                            <p className={`text-xs ${T.t3} mb-2`}>
                                以下の内容でダウンロードします。確認してから「ダウンロード」を押してください。
                            </p>
                            <textarea
                                readOnly
                                value={exportPane.content}
                                className={`w-full h-72 text-xs font-mono rounded-lg p-3 resize-none ${T.inp}`}
                            />
                        </>
                    ) : (
                        <RichText text={md} />
                    )}
                </div>

                {/* Footer */}
                <div
                    className={`flex items-center justify-end gap-2 px-4 py-2.5 border-t ${T.div} shrink-0`}
                >
                    {exportPane ? (
                        <>
                            <button
                                onClick={() => setExportPane(null)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${T.btnGhost}`}
                            >
                                <ArrowLeft className='w-3 h-3' />
                                キャンセル
                            </button>
                            <button
                                onClick={() => {
                                    const filename =
                                        exportPane.type === 'md'
                                            ? `${pn}.md`
                                            : `${pn}.txt`
                                    const mime =
                                        exportPane.type === 'md'
                                            ? 'text/markdown'
                                            : 'text/plain'
                                    dlFile(exportPane.content, filename, mime)
                                    setExportPane(null)
                                }}
                                className='flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition'
                            >
                                <Download className='w-3.5 h-3.5' />
                                ダウンロード（{exportPane.type.toUpperCase()}）
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setExportPane({ type: 'md', content: md })}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${T.btnGhost}`}
                            >
                                <Download className='w-3 h-3' />
                                MD
                            </button>
                            <button
                                onClick={() => setExportPane({ type: 'txt', content: txt })}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${T.btnGhost}`}
                            >
                                <FileText className='w-3 h-3' />
                                TXT
                            </button>
                            <button
                                onClick={doPrint}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${T.btnGhost}`}
                            >
                                <Printer className='w-3 h-3' />
                                PDF
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
