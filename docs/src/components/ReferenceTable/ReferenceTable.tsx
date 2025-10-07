import * as React from 'react';
import kebabCase from 'es-toolkit/compat/kebabCase';
import type { TypesContentProps } from '@mui/internal-docs-infra/abstractCreateTypes';
import { useTypes } from '@mui/internal-docs-infra/useTypes';
import { PropsReferenceAccordion } from './PropsReferenceAccordion';
import { AttributesReferenceTable } from './AttributesReferenceTable';
import { CssVariablesReferenceTable } from './CssVariablesReferenceTable';
import { HeadingLink } from '../HeadingLink';

type ReferenceTableProps = TypesContentProps<{
  asParam?: string;
}>;

export function ReferenceTable(props: ReferenceTableProps) {
  const { types, multiple } = useTypes(props);

  const type = types && types[0];
  if (type?.type !== 'component') {
    return null;
  }

  const { asParam } = props;
  const data = type.data;
  const componentName = data.name;
  const id = kebabCase(data.name);

  return (
    <React.Fragment>
      {/* Insert an <h3> with the part name for multi-part components.
          Single-part components headings and descriptions aren't displayed
          because they duplicate the page title and subtitle anyway. */}
      {multiple && (
        <React.Fragment>
          <h3
            className="mt-8 mb-1.5 scroll-mt-18 text-lg font-medium text-balance show-side-nav:scroll-mt-6"
            id={id}
          >
            <HeadingLink id={id}>{data.name}</HeadingLink>
          </h3>
          {data.description && <p className="mb-4">{data.description}</p>}
        </React.Fragment>
      )}

      {Object.keys(data.props).length > 0 && (
        <PropsReferenceAccordion
          name={
            asParam && data.name.startsWith(componentName)
              ? `${asParam}${data.name.substring(componentName.length)}`
              : data.name
          }
          data={data.props}
          renameFrom={asParam ? componentName : undefined}
          renameTo={asParam}
          className="mt-5 mb-6"
        />
      )}

      {Object.keys(data.dataAttributes).length > 0 && (
        <AttributesReferenceTable data={data.dataAttributes} className="mt-5 mb-6" />
      )}

      {Object.keys(data.cssVariables).length > 0 && (
        <CssVariablesReferenceTable data={data.cssVariables} className="mt-5 mb-6" />
      )}
    </React.Fragment>
  );
}
