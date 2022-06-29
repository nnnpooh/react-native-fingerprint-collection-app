import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAppSelector} from 'src/store/hook';
import {ModalType} from 'src/components/location/types/modal';
import {LocationFormDataType} from 'src/components/location/types/location';

function useLocationForm(modalType: ModalType) {
  const {sites, currentSite, points, currentPoint} = useAppSelector(
    state => state.location,
  );

  let siteTextsAll = sites.map(site => sanitizeText(site.text));
  let pointTextsAll = points.map(point => sanitizeText(point.text));

  // Filter out the current site so that there is no error when editing.
  let siteTextsExceptCurrent = siteTextsAll.filter(
    text => text !== sanitizeText(currentSite.text),
  );
  let pointTextsExceptCurrent = pointTextsAll.filter(
    text => text !== sanitizeText(currentPoint.text),
  );

  let testFunction: yup.TestFunction<string | undefined>;
  const defaultValuesBlank: LocationFormDataType = {
    text: '',
    submission: null,
  };

  let resetValues: LocationFormDataType;
  switch (modalType) {
    case 'ADD_SITE':
      testFunction = text => {
        if (!text) return false;
        return !siteTextsAll.includes(sanitizeText(text));
      };
      resetValues = defaultValuesBlank;
      break;
    case 'EDIT_SITE':
      testFunction = text => {
        if (!text) return false;
        return !siteTextsExceptCurrent.includes(sanitizeText(text));
      };
      resetValues = {text: currentSite.text, submission: null};
      break;
    case 'ADD_POINT':
      testFunction = text => {
        if (!text) return false;
        return !pointTextsAll.includes(sanitizeText(text));
      };
      resetValues = defaultValuesBlank;
      break;
    case 'EDIT_POINT':
      testFunction = text => {
        if (!text) return false;
        return !pointTextsExceptCurrent.includes(sanitizeText(text));
      };
      resetValues = {text: currentPoint.text, submission: null};
      break;
  }

  const schema = yup.object({
    text: yup.string().required().test({
      name: 'duplicate-name',
      message: 'This name is already taken.',
      test: testFunction,
    }),
  });

  const form = useForm<LocationFormDataType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValuesBlank,
  });

  useEffect(() => {
    form.reset(resetValues);
  }, [modalType, currentSite, currentPoint]);

  return {form};
}

export default useLocationForm;

function sanitizeText(text: string) {
  return text.toLowerCase().replace(/\s/g, '');
}
