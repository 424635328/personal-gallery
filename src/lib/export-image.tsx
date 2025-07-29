// src/lib/export-image.tsx

'use client';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';
import type { OffersTable } from '@/lib/db';
import { calculateOfferScore, calculateMarketPowerIndex } from '@/lib/scoring';
import { OfferReportImage } from '@/components/ui/OfferReportImage';

export async function exportOfferAsPng(offer: OffersTable): Promise<string> {
    const { scores, finalScore: offerScoreValue } = calculateOfferScore(offer);
    const { finalScore: marketPowerIndexValue } = calculateMarketPowerIndex(offer);

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    const root = createRoot(container);
    
    root.render(
      <OfferReportImage
        offer={offer}
        scores={scores}
        offerScore={offerScoreValue}
        marketPowerIndex={marketPowerIndexValue}
      />
    );
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(container, {
      // @ts-ignore
      scale: 4, 
      useCORS: true,
      // 让 html2canvas 背景透明，因为我们的组件自带不透明的渐变背景
      backgroundColor: null,
    });
    
    const fileName = `OfferScore_${offer.company_name}_${offer.job_title}.png`.replace(/[\s/\\?%*:|"<>]/g, '_');
    
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, fileName);
      }
    });

    root.unmount();
    document.body.removeChild(container);

    return fileName;
}