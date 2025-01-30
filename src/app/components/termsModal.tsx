"use client";

import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface TermsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function TermsModal({ isOpen, onRequestClose }: TermsModalProps) {
    return (
        <Dialog open={isOpen} onClose={onRequestClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="mx-auto max-w-2xl rounded bg-white p-6">
                    <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Terms and Conditions
                    </DialogTitle>

                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            {/* Add your terms and conditions text here */}
                            By using this service, you agree to our terms and conditions...
                        </p>
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                            onClick={onRequestClose}
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
