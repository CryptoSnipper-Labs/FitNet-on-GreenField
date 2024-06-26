// @ts-nocheck
"use client"
import useMemoizedAddressLabel from '@/hooks/useMemoizedAddressLabel';
import Link from 'next/link';
import React, { useContext } from 'react';
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { ImNewTab } from "react-icons/im";


type AddressLabelProps = {
    address: string | undefined
    isTransactionAddress?: boolean
    showBlockExplorerLink?: boolean
    showCopyIntoClipboardButton?: boolean
    useFullAddress?: boolean
    enableTransaction?: boolean
    character?: number
}


const AddressLabel = ({
    address,
    isTransactionAddress,
    showBlockExplorerLink,
    showCopyIntoClipboardButton = true,
    useFullAddress = false,
    enableTransaction = false,
    character = 6,
}: AddressLabelProps) => {

    const addressLabel = useMemoizedAddressLabel(address, character)

    const blockExplorerLink = `${process.env.NEXT_PUBLIC_GREENFIELD_BLOCKEXPLORER_URL}/${isTransactionAddress ? 'tx' : 'address'
        }/${address}`


    return (
        <div className='flex flex-row gap-1 items-center'>
            <span>{useFullAddress ? address : addressLabel}</span>
            {showBlockExplorerLink && blockExplorerLink && (
                <Link target='_blank' href={blockExplorerLink}><MdOpenInNew /></Link>
            )}

            {showCopyIntoClipboardButton && (
                <div onClick={() => navigator?.clipboard?.writeText?.(address)}>
                    <AiOutlineCopy />
                </div>)}

            {enableTransaction && (
                <Link href={`/transactions/${address}`}>
                    {<ImNewTab />}
                </Link>

            )}

        </div>
    );
};

export default AddressLabel;