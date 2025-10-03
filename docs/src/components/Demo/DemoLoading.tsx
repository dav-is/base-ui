import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import clsx from 'clsx';
import { Collapsible } from '@base-ui-components/react/collapsible';
import { DemoFileSelector } from './DemoFileSelector';
import { DemoCodeBlock } from './DemoCodeBlock';
import { DemoPlayground } from './DemoPlayground';

export type DemoLoadingProps = ContentLoadingProps<{
  defaultOpen?: boolean;
  compact?: boolean;
  className?: string;
}>;

export function DemoLoading({
  defaultOpen = false,
  compact = false,
  className,
  component,
  source,
  fileNames,
  initialFilename,
}: DemoLoadingProps) {
  const files = React.useMemo(
    () =>
      fileNames?.map((name) => ({ name })) ||
      (initialFilename ? [{ name: initialFilename }] : undefined),
    [fileNames, initialFilename],
  );

  return (
    <div className={clsx('DemoRoot', className)}>
      <DemoPlayground component={component} variant="css-modules" />
      <Collapsible.Root open={defaultOpen}>
        <div role="figure" aria-label="Component demo code">
          {files && !compact && (
            <div className="DemoToolbar">
              <DemoFileSelector files={files} selectedFileName={initialFilename} />

              <div className="ml-auto flex items-center gap-4"></div>
            </div>
          )}

          <DemoCodeBlock
            selectedFile={source}
            selectedFileLines={20 /* TODO: the fallback should give us this */}
            collapsibleOpen={defaultOpen}
            compact={compact}
          />
        </div>
      </Collapsible.Root>
    </div>
  );
}
